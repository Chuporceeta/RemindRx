import {Link, useNavigate} from 'react-router-dom';
import {useState} from 'react';

function HomePage(){
    const recentlyTakenMeds = [
        { name: "Kartik", dosage: "10mg", timeAgo: "90 min ago"},
        { name: "Xabier", dosage: "5mg", timeAgo: "2 hrs ago"}
    ];
    const upcomingMeds = [
        { name: "Christian", dosage: "5mg", time: "in 3 hours"},
        { name: "Joseph", dosage: "10mg", time: "in 6 hours"},
    ]
    return(
        <div className="home-page container mx-auto py-10">
            
        </div>
    );
}
export default HomePage;