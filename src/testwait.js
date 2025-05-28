import readline from 'readline';

async function wait() {
    const stdin = process.stdin
    console.log("...press the any key...")
    stdin.setRawMode(true)
    stdin.resume()
    return new Promise((resolve) => {
      stdin.on('data', () => {
        console.log()
        stdin.pause()
        stdin.removeAllListeners('data')
        resolve()
      })
    })
  }

// Example usage
(async () => {
    console.log('Before pause');
    await wait();
    console.log('After pause');
})();

/*
    memory-first 
    https://github.com/guyroyse/memory-first.git
*/