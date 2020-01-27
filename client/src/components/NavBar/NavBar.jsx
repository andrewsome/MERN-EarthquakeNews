import React from 'react';
import './NavBar.scss';
import { Link} from 'react-router-dom';

export default function NavBar() {
  return (
    <div className='NavBar'>
      <ul>
        <Link to='/'>
          <li><strong>Top 10</strong></li>
        </Link>
        <Link to='/detail'>
          <li><strong>Earthquake Detail</strong></li>
        </Link>
        <Link to='/latest'>
          <li><strong>Retrieve Latest</strong></li>
        </Link>
      </ul>
    </div>
  )
}
