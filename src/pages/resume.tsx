import React from "react";
import Image from "@combostrap/interact/components/Image";
import resume from "../resources/resume/resume-data";
import Grid from "@combostrap/interact/components/Grid";
import GridCell from "@combostrap/interact/components/GridCell";
import {Frontmatter, TocNode} from "@combostrap/interact/types";

// noinspection JSUnusedGlobalSymbols
export const frontmatter: Frontmatter = {
    layout: "holy-prose",
    title: "Resume",
    hero: "false"
}

const themeColor = "#00489C";

// noinspection JSUnusedGlobalSymbols - used dynamically
let profileId = "profile-id";
let characteristicsId = "char-id";
let projectsId = "projects-id";
let educationId = "edu-id";
let workId = "work-id";
let skillId = "skill-id";
let languagesInterestId = "lang-inter-id";


// noinspection JSUnusedGlobalSymbols
export const toc: TocNode[] = [
    {
        value: "Profile",
        depth: 1,
        id: profileId
    },
    {
        value: "Characteristics",
        depth: 1,
        id: characteristicsId
    },
    {
        value: "Projects",
        depth: 1,
        id: projectsId
    },
    {
        value: "Work Experience",
        depth: 1,
        id: workId
    },
    {
        value: "Education",
        depth: 1,
        id: educationId
    },
    {
        value: "Skills",
        depth: 1,
        id: skillId
    },
    {
        value: "Languages and Interests",
        depth: 1,
        id: languagesInterestId
    }
]

function formatDate(value?: string): string | null {
    if (!value) {
        return null;
    }
    const [year, month] = value.split("-");
    if (!month) {
        return year;
    }
    return `${year}-${month}`;
}

function formatDateRange(startDate?: string, endDate?: string): string {
    const start = formatDate(startDate);
    const end = endDate ? formatDate(endDate) : "Present";
    if (!start && !endDate) {
        return "";
    }
    return `${start ?? ""}${start ? " - " : ""}${end ?? ""}`;
}

// noinspection JSUnusedGlobalSymbols
export default function Resume() {
    const profile = Object.values(resume.profiles ?? {})[0];
    const characteristics = Object.values(resume.characteristics ?? {});
    const projects = Object.values(resume.projects ?? {});
    const workEntries = Object.values(resume.work ?? {});
    const educationEntries = Object.values(resume.education ?? {});
    const languageEntries = Object.values(resume.languages ?? {});
    const interestEntries = resume.interests ?? [];
    const skills = Object.entries(resume.skills ?? {});
    const skillCategories = skills.filter(([, skill]) => skill.type === "category");
    const childSkillsByParent = new Map<string, string[]>();
    skills
        .filter(([, skill]) => skill.parentId)
        .forEach(([, skill]) => {
            if (!skill.parentId) {
                return;
            }
            const existing = childSkillsByParent.get(skill.parentId) ?? [];
            existing.push(skill.name);
            childSkillsByParent.set(skill.parentId, existing);
        });

    return (
        <>
            <header className={"mb-8 border-b pb-6"}>
                <h1 className={"text-4xl font-bold"} style={{color: themeColor}}>
                    {resume.basics.name}
                </h1>
                {profile?.title && <p className={"mt-2 text-xl"}>{profile.title}</p>}
                {profile?.lead && <p className={"mt-1 text-base"}>{profile.lead}</p>}
                <div className={"mt-4 flex flex-wrap gap-x-6 gap-y-1 text-sm"}>
                    {resume.basics.email && <span>{resume.basics.email}</span>}
                    {resume.basics.phone && <span>{resume.basics.phone}</span>}
                    {resume.basics.location?.city && <span>{resume.basics.location.city}</span>}
                    {resume.basics.url && (
                        <a href={resume.basics.url} style={{color: themeColor}}>
                            {resume.basics.url}
                        </a>
                    )}
                </div>
            </header>

            <section className={"mb-8"} id={profileId}>
                <h2 className={"mb-2 text-2xl font-semibold"} style={{color: themeColor}}>Profile</h2>
                <p>{profile.description}</p>
            </section>


            <section className={"mb-8"} id={characteristicsId}>
                <h2 className={"mb-3 text-2xl font-semibold"} style={{color: themeColor}}>Characteristics</h2>
                <Grid className={"cells-gap-10"}>
                    {characteristics.map((item, index) => (
                        <GridCell key={index}>
                            <div className={"rounded border p-4 w-60"}>
                                <h3 className={"font-semibold"}>{item.title}</h3>
                                {item.description && <p className={"mt-1 text-sm"}>{item.description}</p>}
                            </div>
                        </GridCell>
                    ))}
                </Grid>
            </section>

            {projects.length > 0 && (
                <section className={"mb-8"} id={projectsId}>
                    <h2 className={"mb-3 text-2xl font-semibold"} style={{color: themeColor}}>Projects</h2>
                    <div className={"space-y-4"}>
                        {projects.map((project) => (
                            <article key={project.name} className={"rounded border p-4"}>
                                {project.name && <h3 className={"text-lg font-semibold"}>{project.name}</h3>}
                                {project.description && <p className={"mt-1"}>{project.description}</p>}
                                {project.image && (
                                    <div className={"mt-3 max-w-sm"}>
                                        <Image src={project.image} alt={project.description}/>
                                    </div>
                                )}
                                {project.notes && project.notes.length > 0 && (
                                    <ul className={"mt-2 list-disc pl-5"}>
                                        {project.notes.map((note) => (
                                            <li key={note}>{note}</li>
                                        ))}
                                    </ul>
                                )}
                                {project.highlights && project.highlights.length > 0 && (
                                    <ul className={"mt-2 list-disc pl-5 text-sm"}>
                                        {project.highlights.map((highlight) => (
                                            <li key={highlight.highlight}>{highlight.highlight}</li>
                                        ))}
                                    </ul>
                                )}
                            </article>
                        ))}
                    </div>
                </section>
            )}

            {workEntries.length > 0 && (
                <section className={"mb-8"} id={workId}>
                    <h2 className={"mb-3 text-2xl font-semibold"} style={{color: themeColor}}>Work Experience</h2>
                    <div className={"space-y-4"}>
                        {workEntries.map((work, index) => (
                            <p key={index}>
                                {formatDateRange(work.startDate, work.endDate)} - <span
                                className={"font-semibold"}>{work.position}</span> - <a href={work.url}>{work.name}</a>
                            </p>
                        ))}
                    </div>
                </section>
            )}

            {educationEntries.length > 0 && (
                <section className={"mb-8"} id={educationId}>
                    <h2 className={"mb-3 text-2xl font-semibold"} style={{color: themeColor}}>Education</h2>
                    <div className={"space-y-4"}>
                        {educationEntries.map((education) => (
                            <article key={`${education.institution}-${education.startDate}`}
                                     className={"rounded border p-4"}>
                                <div className={"flex flex-wrap items-baseline justify-between gap-2"}>
                                    <h3 className={"font-semibold"}>{education.studyType} {education.area ? `- ${education.area}` : ""}</h3>
                                    <span
                                        className={"text-sm"}>{formatDateRange(education.startDate, education.endDate)}</span>
                                </div>
                                {education.institution && <p className={"text-sm"}>{education.institution}</p>}
                                {education.notes && <p className={"mt-1 text-sm"}>{education.notes}</p>}
                            </article>
                        ))}
                    </div>
                </section>
            )}

            {skillCategories.length > 0 && (
                <section className={"mb-8"} id={skillId}>
                    <h2 className={"mb-3 text-2xl font-semibold"} style={{color: themeColor}}>Skills</h2>
                    <div className={"grid gap-3 md:grid-cols-2"}>
                        {skillCategories.map(([id, skill]) => (
                            <article key={id} className={"rounded border p-4"}>
                                <h3 className={"font-semibold"}>{skill.name}</h3>
                                {skill.description && <p className={"mt-1 text-sm"}>{skill.description}</p>}
                                {(childSkillsByParent.get(id) ?? []).length > 0 && (
                                    <p className={"mt-2 text-sm"}>
                                        {(childSkillsByParent.get(id) ?? []).join(", ")}
                                    </p>
                                )}
                            </article>
                        ))}
                    </div>
                </section>
            )}

            {(languageEntries.length > 0 || interestEntries.length > 0) && (
                <section className={"mb-2"} id={languagesInterestId}>
                    <h2 className={"mb-3 text-2xl font-semibold"} style={{color: themeColor}}>Languages & Interests</h2>
                    {languageEntries.length > 0 && (
                        <p>
                            {languageEntries.map((language) => `${language.language}: ${language.fluency}`).join(" • ")}
                        </p>
                    )}
                    {interestEntries.length > 0 && (
                        <p className={"mt-2"}>
                            {interestEntries
                                .flatMap((interest) => interest.keywords ?? [])
                                .join(" • ")}
                        </p>
                    )}
                </section>
            )}
        </>
    )
}