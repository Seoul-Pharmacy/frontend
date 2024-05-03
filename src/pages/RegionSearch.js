import React, { useState, useEffect } from 'react';

import regionApi from '../api/regionApi';
import './RegionSearch.css';

import Header from "../components/Header";
import SearchDesign from "../components/SearchDesgin";
import RegionResult from '../components/result/RegionResult';
import Pagination from '../components/Pagination';
import Footer from "../components/Footer";

export default function RegionSearch() {
    const [currentPage, setCurrentPage] = useState(1);
    const [pharmacies, setPharmacies] = useState([]);
    const [totalItems, setTotalItems] = useState(0);
    const itemsPerPage = 5;

    const fetchPharmacies = () => {
        regionApi(currentPage)
            .then(data => {
                setPharmacies(data.results || []);
                setTotalItems(data.count || 0);
            }).catch(error => {
                console.error("Failed to fetch pharmacies:", error);
            });
    }

    useEffect(() => {
        fetchPharmacies(currentPage);
    }, [currentPage]);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };
    
    return(
        <>
            <Header />
            <SearchDesign>선택 지역 기반 정보 제공</SearchDesign>
            <div>
                <button
                    id="pharmacy-search-button"
                    onClick={fetchPharmacies}
                >
                    검색
                </button>
                <RegionResult result={pharmacies}/>
                <Pagination
                    totalItems={totalItems}
                    paginate={handlePageChange}
                    currentPage={currentPage}
                    itemsPerPage={itemsPerPage}
                />
            </div>
            <Footer />
        </>
    );
}