import React, { ReactElement } from 'react';
import Image from 'next/image';

import styles from '../styles/Navbar.module.css';

interface Props {
  logoURL: string;
  menuLabel: string;
}

function Navbar({ logoURL, menuLabel }: Props): ReactElement {
  return (
    <div className={styles.navContainer}>
      <Image
        // Need to prefix https as the url from API doesn't inclde it.
        src={`https:${logoURL}`}
        alt="credible mind - logo"
        height={70}
        width={180}
      />
      <div className={styles.menuLabel}>{menuLabel}</div>
    </div>
  );
}

export default Navbar;
