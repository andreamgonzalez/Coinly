import React, {useState, useEffect} from "react";
import SearchForm from "../common/SearchForm";
import CoinlyApi from "../api/api";
import CompanyCard from "./CompanyCard";
import LoadingSpinner from "../common/LoadingSpinner";


function CompanyList() {
    const[companies, setCompanies] = useState(null);

    useEffect(function getComapnies(){
        search();
    }, []);

    async function search(name){
        let companies = await CoinlyApi.getCompanies(name);
        setCompanies(companies);
    }

    if (!companies){
        return <LoadingSpinner />;
    }

    return(
        <div>
            <SearchForm searchFor={search} />
            {companies.length ? (
                <div className="CompanyList-list">
                    {companies.map(c => (
                        <CompanyCard 
                                key={c.handle}
                                handle={c.handle}
                                name={c.name}
                                description={c.description}
                                logoUrl={c.logoUrl}
                        />
                    ))}
                </div>
            ):(
                <p className="lead">Sorry, no results were found.</p>
            )}
        </div>
    );
}

export default CompanyList;