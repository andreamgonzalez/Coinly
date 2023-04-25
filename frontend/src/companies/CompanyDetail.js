import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import CoinlyApi from "../api/api";
import CoinlyCardList from "../coins/CoinCardList";
import LoadingSpinner from "../common/LoadingSpinner";

/** Company Detail page.
 *
 * Renders information about company, along with the coins at that company.
 *
 * Routed at /companies/:handle
 *
 * Routes -> CompanyDetail -> CoinCardList
 */

function CompanyDetail() {
    const { handle } = useParams();
    const [company, setCompany] = useState(null);

    

    useEffect(function getCompanyAndCoinsForUser(){
        async function getCompany() {
            setCompany(await CoinlyApi.getCompany(handle));
        }
        getCompany();
    }, [handle]);

    if (!company) {
        return <LoadingSpinner />;
    }
        return (
            <div className="CompanyDetail">
                <h4>{company.name}</h4>
                <p>{company.description}</p>
                <CoinlyCardList coins={company.coins} />
            </div>
        );
}

export default CompanyDetail;