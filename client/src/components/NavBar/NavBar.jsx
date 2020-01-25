import React from 'react';
import './NavBar.scss';
import { Link} from 'react-router-dom';

export default function NavBar() {
  return (
    <div className='NavBar'>
      <ul>
        <Link to='/'>
          <li>Top 10</li>
        </Link>
        <Link to='/detail'>
          <li>Earthquake Detail</li>
        </Link>
        <Link to='/latest'>
          <li>Retrieve Latest</li>
        </Link>
      </ul>
    </div>
  )
}
