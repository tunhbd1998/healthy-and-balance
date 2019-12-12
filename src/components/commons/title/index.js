import React from "react";
import {Helmet} from "react-helmet";

export default function TitleComponent({title}) {
    return (
        <Helmet>
            <title>{title ? `${title} - Healthy And Balance` : "Healthy And Balance"}</title>
        </Helmet>
    )
}