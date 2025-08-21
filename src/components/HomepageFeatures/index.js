import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

const FeatureList = [
  {
    title: 'Easy Integration',
    icon: '🔧',
    description: (
      <>
        VaultiScan Embedding SDK was designed to be easily integrated into your existing applications
        with minimal configuration and maximum security coverage.
      </>
    ),
  },
  {
    title: 'Real-time Scanning',
    icon: '⚡',
    description: (
      <>
        Monitor your applications in real-time with continuous vulnerability scanning and 
        instant security alerts to keep your systems protected 24/7.
      </>
    ),
  },
  {
    title: 'Comprehensive Reports',
    icon: '📊',
    description: (
      <>
        Generate detailed security reports with actionable insights, compliance tracking,
        and vulnerability assessments to strengthen your security posture.
      </>
    ),
  },
];

function Feature({icon, title, description}) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <div className={styles.featureIcon}>{icon}</div>
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
