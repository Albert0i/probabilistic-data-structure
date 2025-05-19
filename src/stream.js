import { redis } from './redis/redis.js'
import  { blockForTime, consumerIdleTime } from './config.js'

export async function createConsumerGroup(stream, group) {
  /*
     The command's <id> argument specifies the last delivered 
     entry in the stream from the new group's perspective. 
     The special ID $ is the ID of the last entry in the stream, 
     but you can substitute it with any valid ID.
  */
  try {
    await redis.xGroupCreate(stream, group, '$', { MKSTREAM: true })
  } catch(error) {
    if (error.message !== "BUSYGROUP Consumer Group name already exists") throw error
    console.log("Consumer group already exists, skipping creation")
  }
}

/*
   Note, however, that any pending messages that the consumer 
   had will become unclaimable after it was deleted. It is 
   strongly recommended, therefore, that any pending messages 
   are claimed or acknowledged prior to deleting the consumer 
   from the group.
*/
export async function removeIdleConsumers(stream, group) {
  const consumers = await redis.xInfoConsumers(stream, group)

  for (const consumer of consumers) {
    if (consumer.pending === 0) {
      console.log(`Deleting consumer '${consumer.name}'`)
      await redis.xGroupDelConsumer(stream, group, consumer.name)
    }
  }
}

export async function claimPendingEvent(stream, group, consumer) {
  /*
     '-': Starts scanning from the oldest pending message.
     '0-0': Indicates that the entire stream has been scanned and 
            there are no more pending messages to claim.
  */
  const response = await redis.xAutoClaim(
    stream, group, consumer,
    consumerIdleTime, '-', { COUNT: 1 })

  const event = response.messages.length === 0 ? null : response.messages[0]
  return event
}

export async function readNextEvent(stream, group, consumer) {
  /*
     if the ID is not >, then the command will just let the client
     access its pending entries: messages delivered to it, but not 
     yet acknowledged. Note that in this case, both BLOCK and NOACK 
     are ignored.
  */
  const response = await redis.xReadGroup(group, consumer, [
    { key: stream, id: '>' }
  ], {
    COUNT: 1,
    BLOCK: blockForTime
  })

  const event = response === null ? null : response[0].messages[0]
  return event
}

export async function acknowledgeEvent(stream, group, event) {
  await redis.xAck(stream, group, event.id)
}