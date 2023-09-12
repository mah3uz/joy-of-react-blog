'use client';
import React from 'react';
import clsx from 'clsx';
import {useRouter} from "next/navigation";
import { Rss, Sun, Moon } from 'react-feather';

import Logo from '@/components/Logo';
import VisuallyHidden from '@/components/VisuallyHidden';
import styles from './Header.module.css';
import {useToggleTheme} from "@/utils";

function Header({ initialTheme, className, ...delegated }) {
  const [theme, setTheme] = useToggleTheme(initialTheme);
  const router = useRouter();

  return (
    <header
      className={clsx(styles.wrapper, className)}
      {...delegated}
    >
      <Logo />

      <div className={styles.actions}>
        <button className={styles.action} onClick={() => router.push('/rss')}>
          <Rss
            size="1.5rem"
            style={{
              // Optical alignment
              transform: 'translate(2px, -2px)',
            }}
          />
          <VisuallyHidden>
            View RSS feed
          </VisuallyHidden>
        </button>
        <button onClick={setTheme} className={styles.action}>
          {theme === 'light' ? <Sun size="1.5rem"/> : <Moon size="1.5rem"/>}
          <VisuallyHidden>
            Toggle dark / light mode
          </VisuallyHidden>
        </button>
      </div>
    </header>
  );
}

export default Header;
