import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";

function ArtInfo({key, image, title, artist, medium, culture, date, id}) {
    return (
        <tr key={key}>
            <td><img src={image}></img></td>
            <td><Link to={`/artDetails/${id}`} key={id}>{title}</Link></td>
            <td>{artist}</td>
            <td>{medium}</td>
            <td>{culture}</td>
        </tr>
    );
}

export default ArtInfo