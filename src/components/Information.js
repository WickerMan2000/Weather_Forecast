import React from 'react';
import Image from './Image';
import styles from './Information.module.css';

const Information = ({ index, date, icon, description, temperature }) => {
    return (
        <article className={styles.DayDetails} key={index}>
            <h1>{new Date(date * 1000).toLocaleDateString('en-EN', { 'weekday': 'long' })}</h1>
            <Image icon={icon} desc={description} />
            <h2 className={styles.Description}>{description}</h2>
            <h3>{new Date(date * 1000).toLocaleTimeString('en-EN', { hour: '2-digit', minute: '2-digit' })}</h3>
            <p className={styles.DayTemperature}><span>{Math.round(temperature)}</span>&deg;C</p>
        </article>
    );
}

export default Information;