import { redis } from './redis/redis.js'
import { streamKey, consumerGroupName1, cardinalityKey, topKKey } from './config.js'
import { createConsumerGroup, removeIdleConsumers, claimPendingEvent, readNextEvent, acknowledgeEvent } from './stream.js'

/*
   main 
*/
// wait for redis to be ready
await redis.connect();

// create a unique name for this consumer
//const consumerName = `consumer-${ulid()}`
const consumerName = `consumer-${generateRandom3Digit()}`

console.log(`Hey! I'm '${consumerName}'`)
// create the consumer group and remove idle consumers
await createConsumerGroup(streamKey, consumerGroupName1)
await removeIdleConsumers(streamKey, consumerGroupName1)

// loop forever to read from stream
while (true) {
  try {
    // try to claim an old event first
    let event = await claimPendingEvent(streamKey, consumerGroupName1, consumerName)
    if (event) console.log("Claimed pending event", event)

    // read next event from the stream if nothing was claimed
    if (event === null) {
      event = await readNextEvent(streamKey, consumerGroupName1, consumerName)

      if (event) console.log("Read event", event)
    }

    // loop if nothing new was found
    if (event === null) {
      console.log("No event received, looping.")
      continue
    }

    // process the event
    await processEvent(event)
    console.log("Processed event", event.id)

    // acknowledge that the event was processed
    await acknowledgeEvent(streamKey, consumerGroupName1, event)
    console.log("Acknowledged event", event.id)

  } catch (error) {
    console.log("Error reading from stream", error)
  }
}

async function processEvent(event) {
  // imitate delay 
  await new Promise(resolve => setTimeout(resolve, generateRandom3Digit()));

  await Promise.all([
    redis.sendCommand(['MULTI']),
    redis.sendCommand(['PFADD', cardinalityKey, event.message.fullname]),
    redis.sendCommand(["TOPK.ADD", topKKey, event.message.fullname]),
    redis.sendCommand(['EXEC']),
  ]); 
}

function generateRandom3Digit() {
  return Math.floor(100 + Math.random() * 900);
}
// TOPK.RESERVE PDS:demo:users:freq 100 1000 10 0.999
// TOPK.RESERVE PDS:demo:users:freq 100 2000 15 0.9999
// TOPK.RESERVE PDS:demo:users:freq 100 5000 20 0.99999
// TOPK.RESERVE PDS:demo:users:freq 100 10000 30 0.999999
