import React from 'react'
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';

export default function Footer() {
  return (
    <footer>
      <div>
        <p>Built by Cynthia Amaehule &copy; 2023</p>
      </div>
      <div>
        <ul>
          <li><a href="#"><FacebookIcon/></a></li>
          <li><a href="#"><InstagramIcon/></a></li>
          <li><a href="#"><TwitterIcon/></a></li>
        </ul>
      </div>
    </footer>
  )
}
