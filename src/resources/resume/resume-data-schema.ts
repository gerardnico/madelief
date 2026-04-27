import {z} from "zod";

// --- Shared definitions ---

const iso8601 = z
    .string()
    .regex(
        /^([1-2][0-9]{3}-[0-1][0-9]-[0-3][0-9]|[1-2][0-9]{3}-[0-1][0-9]|[1-2][0-9]{3})$/,
        "Must be a valid ISO 8601 date (YYYY, YYYY-MM, or YYYY-MM-DD)"
    )
    .describe(
        "Similar to the standard date type, but each section after the year is optional. e.g. 2014-06-29 or 2023-04"
    );

const location = z
    .object({
        address: z
            .string()
            .describe(
                "To add multiple address lines, use \\n. For example, 1234 Glücklichkeit Straße\\nHinterhaus 5. Etage li."
            )
            .optional(),
        postalCode: z.string().optional(),
        city: z.string().optional(),
        countryCode: z
            .string()
            .describe("code as per ISO-3166-1 ALPHA-2, e.g. US, AU, IN")
            .optional(),
        region: z
            .string()
            .describe(
                "The general region where you live. Can be a US state, or a province, for instance."
            )
            .optional(),
    })
    .passthrough();

const highlight = z.object({
    highlight: z
        .string()
        .describe("e.g. Increased profits by 20% from 2011-2012 through viral advertising")
        .optional(),
    tags: z
        .array(z.string())
        .describe(
            "For selection, it can be a resume profile (data-engineer, ...) or a subject (quality, ...)"
        )
        .optional(),
});

const highlights = z
    .array(highlight)
    .describe("Specify multiple accomplishments");

// --- Main sections ---

const basics = z
    .object({
        name: z.string().optional(),
        label: z.string().describe("e.g. Web Developer").optional(),
        image: z
            .string()
            .describe("URL (as per RFC 3986) to a image in JPEG or PNG format")
            .optional(),
        email: z.string().email().describe("e.g. thomas@gmail.com").optional(),
        phone: z
            .string()
            .describe(
                "Phone numbers are stored as strings so use any format you like, e.g. 712-117-2923"
            )
            .optional(),
        url: z
            .string()
            .url()
            .describe(
                "URL (as per RFC 3986) to your website, e.g. personal homepage"
            )
            .optional(),
        location: location.optional(),
        profiles: z
            .array(
                z
                    .object({
                        network: z
                            .string()
                            .describe("e.g. Facebook or Twitter")
                            .optional(),
                        networkIcon: z
                            .string()
                            .describe("e.g. github.svg")
                            .optional(),
                        username: z
                            .string()
                            .describe("e.g. neutralthoughts")
                            .optional(),
                        url: z
                            .string()
                            .url()
                            .describe("e.g. https://twitter.example.com/neutralthoughts")
                            .optional(),
                    })
                    .passthrough()
            )
            .describe("Specify any number of social networks that you participate in")
            .optional(),
    })
    .passthrough();

const workEntry = z.object({
    name: z.string().describe("e.g. Facebook").optional(),
    market: z.string().describe("Education, RailWay, ...").optional(),
    location: z.string().describe("e.g. Menlo Park, CA").optional(),
    description: z.string().describe("e.g. Social Media Company").optional(),
    position: z.string().describe("e.g. Software Engineer").optional(),
    url: z
        .string()
        .url()
        .describe("e.g. http://facebook.example.com")
        .optional(),
    startDate: iso8601.optional(),
    endDate: iso8601.optional(),
    summary: z
        .string()
        .describe("Give an overview of your responsibilities at the company")
        .optional(),
    highlights: highlights.optional(),
});

const work = z.record(z.string(), workEntry);
export type WorkEntryType = z.infer<typeof workEntry>

const volunteerEntry = z
    .object({
        organization: z.string().describe("e.g. Facebook").optional(),
        position: z.string().describe("e.g. Software Engineer").optional(),
        url: z
            .string()
            .url()
            .describe("e.g. http://facebook.example.com")
            .optional(),
        startDate: iso8601.optional(),
        endDate: iso8601.optional(),
        summary: z
            .string()
            .describe("Give an overview of your responsibilities at the company")
            .optional(),
        highlights: highlights.optional(),
    })
    .passthrough();

const volunteer = z.array(volunteerEntry);

const educationEntry = z.object({
    institution: z
        .string()
        .describe("e.g. Massachusetts Institute of Technology")
        .optional(),
    url: z
        .string()
        .url()
        .describe("e.g. http://facebook.example.com")
        .optional(),
    area: z.string().describe("e.g. Arts").optional(),
    notes: z.string().describe("Extra informations").optional(),
    images: z
        .object({
            other: z.string().url().describe("A link").optional(),
            svg: z.string().url().describe("A link to a svg").optional(),
        })
        .optional(),
    studyType: z.string().describe("e.g. Bachelor").optional(),
    startDate: iso8601.optional(),
    endDate: iso8601.optional(),
    score: z
        .string()
        .describe("grade point average, e.g. 3.67/4.0")
        .optional(),
    location: location.optional(),
    courses: z
        .array(
            z.string().describe("e.g. H1302 - Introduction to American history")
        )
        .describe("List notable courses/subjects")
        .optional(),
});

const education = z.record(z.string(), educationEntry);

const award = z
    .object({
        title: z
            .string()
            .describe("e.g. One of the 100 greatest minds of the century")
            .optional(),
        date: iso8601.optional(),
        awarder: z.string().describe("e.g. Time Magazine").optional(),
        summary: z
            .string()
            .describe("e.g. Received for my work with Quantum Physics")
            .optional(),
    })
    .passthrough();

const awards = z
    .array(award)
    .describe(
        "Specify any awards you have received throughout your professional career"
    );

const certificateEntry = z
    .object({
        name: z
            .string()
            .describe("e.g. Certified Kubernetes Administrator")
            .optional(),
        date: iso8601.optional(),
        url: z.string().describe("e.g. https://example.com").optional(),
        issuer: z.string().describe("e.g. CNCF").optional(),
        keywords: z
            .array(z.string().describe("e.g. HTML"))
            .describe("List some keywords pertaining to this certificate")
            .optional(),
    })
    .passthrough();

const certificates = z
    .record(z.string(), certificateEntry)
    .describe(
        "Specify any certificates you have received throughout your professional career"
    );

const publication = z
    .object({
        name: z.string().describe("e.g. The World Wide Web").optional(),
        publisher: z
            .string()
            .describe("e.g. IEEE, Computer Magazine")
            .optional(),
        releaseDate: iso8601.optional(),
        url: z
            .string()
            .url()
            .describe(
                "e.g. http://www.computer.org.example.com/csdl/mags/co/1996/10/rx069-abs.html"
            )
            .optional(),
        summary: z
            .string()
            .describe(
                "Short summary of publication. e.g. Discussion of the World Wide Web, HTTP, HTML."
            )
            .optional(),
    })
    .passthrough();

const publications = z
    .array(publication)
    .describe("Specify your publications through your career");

const link = z.object(
    {
        "label":z.string().describe("The label of the link"),
        "url": z.string().describe("The url of the link"),
    }
)
const skill = z
    .object({
        name: z.string().describe("e.g. app, library, technology"),
        icon: z.string().describe("File icon name").optional(),
        level: z.number().describe("e.g. Master (5), ..."),
        parentId: z.string().describe("The parent skill id attached").optional(),
        type: z.enum(["app", "library", "technology", "category"]).describe("A category (app, library, technology)"),
        url: z.string().url().describe("e.g. https://example.com").optional(),
        links: z.record(z.string().describe("The link id"), link).optional(),
        description: z.string().describe("A description").optional(),
    });

export type Skill = z.infer<typeof skill>

const skills = z
    .record(z.string().describe("The skill id"), skill)
    .describe("List of skills");

const languageEntry = z
    .object({
        language: z.string().describe("e.g. English, Spanish").optional(),
        fluency: z.string().describe("e.g. Fluent, Beginner").optional(),
    })
    .passthrough();

const languages = z
    .record(z.string(), languageEntry)
    .describe("List any other languages you speak");

const interest = z
    .object({
        name: z.string().describe("e.g. Philosophy").optional(),
        keywords: z
            .array(z.string().describe("e.g. Friedrich Nietzsche"))
            .optional(),
    })
    .passthrough();

const interests = z.array(interest);

const reference = z
    .object({
        name: z.string().describe("e.g. Timothy Cook").optional(),
        reference: z
            .string()
            .describe(
                "e.g. Joe blogs was a great employee, who turned up to work at least once a week. He exceeded my expectations when it came to doing nothing."
            )
            .optional(),
    })
    .passthrough();

const references = z
    .array(reference)
    .describe("List references you have received");

const cardEntry = z.object({
    title: z.string().describe("The title of the card"),
    image: z.string().describe("The image of the card").optional(),
    // image_height: icon may seem small if they don't take all the 24x24 space
    image_height: z.number().describe("The height of the image in em. It's more a ratio so that all icons have the same visual height").optional(),
    description: z
        .string()
        .describe("The description of the card")
        .optional(),
    tags: z
        .array(z.string())
        .describe(
            "The tags to select in work, highlight, ..."
        )
        .optional(),

});

export type Card = z.infer<typeof cardEntry>;

const cards = z
    .record(z.string(), cardEntry)
    .describe("Cards");

const profileEntry = z.object({
    title: z.string().describe("The title of the resume"),
    lead: z.string().describe("A lead"),
    description: z
        .string()
        .describe("The heading text")
        .optional(),
    tags: z
        .array(z.string())
        .describe(
            "The tags to select in work, highlight, ..."
        )
        .optional(),

});

const profiles = z
    .record(z.string(), profileEntry)
    .describe("Project profile");

const projectEntry = z.object({
    name: z.string().describe("e.g. The World Wide Web").optional(),
    description: z
        .string()
        .describe("Short summary of project. e.g. Collated works of 2017.")
        .optional(),
    highlights: highlights.optional(),
    location: location.optional(),
    keywords: z
        .array(z.string().describe("e.g. AngularJS"))
        .describe("Specify special elements involved")
        .optional(),
    startDate: iso8601.optional(),
    endDate: iso8601.optional(),
    url: z
        .string()
        .url()
        .describe(
            "e.g. http://www.computer.org/csdl/mags/co/1996/10/rx069-abs.html"
        )
        .optional(),
    notes: z
        .array(z.string().describe("A line of note"))
        .describe("A free description")
        .optional(),
    roles: z
        .array(z.string().describe("e.g. Team Lead, Speaker, Writer"))
        .describe("Specify your role on this project or in company")
        .optional(),
    entity: z
        .string()
        .describe(
            "Specify the relevant company/entity affiliations e.g. 'greenpeace', 'corporationXYZ'"
        )
        .optional(),
    entityMarket: z
        .string()
        .describe("Specify the market (education, ICT, ...)")
        .optional(),
    type: z
        .string()
        .describe(
            "e.g. 'volunteering', 'presentation', 'talk', 'application', 'conference'"
        )
        .optional(),
});

const projects = z
    .record(z.string(), projectEntry)
    .describe("Specify career projects");

const meta = z
    .object({
        canonical: z
            .string()
            .url()
            .describe("URL (as per RFC 3986) to latest version of this document")
            .optional(),
        version: z
            .string()
            .describe("A version field which follows semver - e.g. v1.0.0")
            .optional(),
        lastModified: z
            .string()
            .describe("Using ISO 8601 with YYYY-MM-DDThh:mm:ss")
            .optional(),
    })
    .passthrough()
    .describe(
        "The schema version and any other tooling configuration lives here"
    );

// --- Root Resume Schema ---

export const resumeDataSchema = z
    .looseObject({
        $schema: z
            .string()
            .describe("Link to the version of the schema that can validate the resume")
            .optional(),
        basics: basics,
        profiles: profiles.optional(),
        characteristics: cards.optional(),
        creations: cards.optional(),
        advanced_skills: cards.optional(),
        work: work.optional(),
        volunteer: volunteer.optional(),
        education: education.optional(),
        awards: awards.optional(),
        certificates: certificates.optional(),
        publications: publications.optional(),
        skills: skills.optional(),
        languages: languages.optional(),
        interests: interests.optional(),
        references: references.optional(),
        projects: projects.optional(),
        meta: meta.optional(),
    })
    .describe("Resume Schema")
    /**
     * Check that skill parent id are known
     */
    .superRefine((data, ctx) => {
        const skillParentIds = new Set(
            Object.entries(data.skills)
                .filter(([, skill]) => skill.type == "category")
                .map(([skillId]) => skillId)
        );
        Object.entries(data.skills).forEach(([skillId, skill]) => {
            if (skill.parentId == null) {
                if (skill.type == "category") {
                    return
                }
            }
            if (!skillParentIds.has(skill.parentId)) {
                ctx.addIssue({
                    code: 'custom',
                    path: ["skill", skillId, "skillId"],
                    message: `The skill ${skillId} has a parentId ${skill.parentId} that is unknown`,
                });
            }
        });
    });

// --- Inferred TypeScript types ---

export type Iso8601 = z.infer<typeof iso8601>;
export type Location = z.infer<typeof location>;
export type Highlight = z.infer<typeof highlight>;
export type Highlights = z.infer<typeof highlights>;
export type Resume = z.infer<typeof resumeDataSchema>;
