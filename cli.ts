import { $ } from 'bun'

for await (const line of $`ls`.lines()) {
  console.log(Bun.color('red', 'ansi') + line)
}
