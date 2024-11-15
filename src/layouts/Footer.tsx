import React from 'react';

import '../styles/layouts/footer.scss';

export default function Footer() {
  return (
    <footer className="footer">
      <p>&copy; {new Date().getFullYear()} LaunchPad. All rights reserved.</p>
    </footer>
  );
}
