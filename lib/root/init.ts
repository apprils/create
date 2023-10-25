
// supposed to be used in CommonJS environment only

process.on("uncaughtException", function(error) {
  console.error("UncaughtException", error)
  process.exit(1)
})

process.on("unhandledRejection", function(reason, promise) {
  console.error("UnhandledRejection", promise, reason)
  process.exit(1)
})

export {}

