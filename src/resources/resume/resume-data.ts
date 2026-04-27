import {resumeDataSchema} from "./resume-data-schema.js";

// resume-en.json should not be loaded with the file system (import.meta.url) as in the build
// we get: ENOENT: no such file or directory, open '/home/admin/code/gerardnico/com-gerardnico/dist/chunks/resume-en.json'
import resume from "./resume-en.json"  with { type: "json" };

const result = resumeDataSchema.safeParse(resume);
if (!result.success) {
    let errorMessage = result.error.issues
        .map(issue => {
            const path = issue.path.join('.');
            return `• ${path}: ${issue.message}`;
        })
        .join('\n');
    let message = `Configuration errors on the loading of the resume file:\n + ${errorMessage}`;
    console.error(message);
    // noinspection ExceptionCaughtLocallyJS
    throw new Error(message)
}
const data = result.data;
export default data;
