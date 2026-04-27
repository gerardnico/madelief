import React from "react";
import Grid from "@combostrap/interact/components/Grid";
import GridCell from "@combostrap/interact/components/GridCell";
import Raster from "@combostrap/interact/components/Raster";


// noinspection JSUnusedGlobalSymbols
export const frontmatter = {
    layout: "hamburger",
    title: "Madelief"
}

// noinspection JSUnusedGlobalSymbols
export default function Home() {

    let stretchedLink = "after:absolute after:inset-0";
    return (
        <>
            <section>
                <div className={'my-5 mt-14 flex items-center md:flex-row flex-col justify-evenly md:w-2/3 m-auto'}>
                    <div>
                        <div className={'text-center'}>
                            <h1>Designer <Raster src={"madelief-blue-word.png"} alt={"Madelief"} height={80} className="m-auto" /></h1>
                            <p className="lead">
                                My name in Madelief Gerard and I am 20
                                years old. I live in Delft where I study. I am
                                currently studying Industrial Design
                                Engineering at the TU university of Delft,
                                and am now in my 2nd year where I am
                                also following the honours program.

                                I define myself as a motivated, energetic,
                                and determined person who wants to do
                                their work well(??).

                                I really enjoy learning new things and
                                talking to people.
                            </p>
                        </div>
                    </div>
                    <div>

                    </div>
                </div>
            </section>
            <section>
                <div className={"flex flex-col items-center mt-24"}>
                    <div className={"w-2xs text-center"}>
                        <h2>Portfolio</h2>
                        <p className="lead">Builder of things</p>
                    </div>
                </div>
                <Grid>
                    <GridCell>
                    </GridCell>
                    <GridCell>
                    </GridCell>
                    <GridCell>
                    </GridCell>
                    <GridCell>
                    </GridCell>
                    <GridCell>
                    </GridCell>
                </Grid>
            </section>
            <section className={"mb-24"}>
                <div className={"text-center mb-5 mt-24"}>
                    <h2>Get In Touch</h2>
                    <p className="lead">Choose your preferred way to connect.</p>
                </div>
                <Grid>
                    <GridCell>
                    </GridCell>
                    <GridCell>
                    </GridCell>
                    <GridCell>
                    </GridCell>
                </Grid>
            </section>
        </>
    )
}