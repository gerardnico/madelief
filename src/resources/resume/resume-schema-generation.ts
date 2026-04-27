import {join} from "path";
import {resumeDataSchema} from "./resume-data-schema.js";
import {z} from 'zod';
import {writeFileSync} from 'fs'

const dir = import.meta.dirname;
const outputPath = join(dir, 'schema.json')

// Generate JSON Schema
// Why input: ZodDefault is now reflected as optional with io: "input".
// https://github.com/colinhacks/zod/issues/4134
const jsonSchema = z.toJSONSchema(resumeDataSchema, {io: "input"})

// Write to file
writeFileSync(outputPath, JSON.stringify(jsonSchema, null, 2))

console.log(`✓ JSON Schema generated at ${outputPath}`)