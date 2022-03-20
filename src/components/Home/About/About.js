import React from 'react'
import FilterVintageRoundedIcon from '@mui/icons-material/FilterVintageRounded';
function About() {
    return (
        <div className='about-page-container'>
            <div className='about-page-card'>
                <h1 className='about-page-card-title'>
                    <FilterVintageRoundedIcon fontSize='small' color="grey" />
                    About Supple
                    <FilterVintageRoundedIcon fontSize='small' color="grey" />
                </h1>
                <p className='about-page-card-content'>With years of expertise and experience, Supple takes great pride in producing premium quality hand made soaps</p>
                <p className='about-page-card-content'>We craft each and every bar with the finest quality of ingredients, which means every time your skin is rejuvenated with a blast of richness and goodness</p>
                <p className='about-page-card-content'>The soaps are nature friendly and are free of harsh chemicals like Hydroxides, SLS,SLE and Parabene</p>
                <p className='about-page-card-content'>Every time you buy a Soap, a part of the proceedings is used in the upliftment of households run by single women</p>
            </div>
        </div>
    )
}

export default About;