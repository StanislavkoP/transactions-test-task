import fs from 'fs/promises'
import path from 'node:path'

export async function readLocalFile(name: string): Promise<string> {
  const filePath = path.join(__dirname, `../assets/${name}`)
  const data = await fs.readFile(filePath, 'utf-8')

  return data
}
