export default function handleFilePathError (e) {
  const {
    code = 'No code defined'
  } = e

  if (code !== 'ENOENT') {
    const {
      message = 'No message defined'
    } = e

    console.log(`💥 ${code} - ${message}`)
  }
}
