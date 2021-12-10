import React, { ReactElement } from "react";
import dayjs from "dayjs";
import customParseFormat from 'dayjs/plugin/customParseFormat';

import styles from "../styles/Card.module.css";

interface Props {
  topics: any[];
  name: string;
  description: string;
  publicationDate: string;
  organization: any[];
  imageURL: string;
}

dayjs.extend(customParseFormat);

function Card({
  topics,
  name,
  description,
  publicationDate,
  organization,
  imageURL,
}: Props): ReactElement {
  return (
    <div className={styles.cardContainer}>
      <div className={styles.imgContainer}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={imageURL}
          className={styles.cardImage}
          alt={name}
        />
      </div>
      <div className={styles.cardContentContainer}>
        <div className={styles.cardTopicContainer}>
          {topics.map((topic) => {
            return (
              <span
                className={styles.cardTopic}
                key={topic.id}
              >
                  {topic.title}
              </span>
            );
          })}
        </div>
        <div className={styles.cardName}>{name}</div>
        <p className={styles.cardDescription}>{description}</p>
        <div className={styles.cardFooter}>
          <span className={styles.cardPublicationDate}>{dayjs(publicationDate).format('MMM DD, YYYY').toString()}</span>
          <div>
            {organization.map((org) => {
              return (
                <span
                  key={org.fields.name}
                  className={styles.cardOrgName}
                >
                  {org.fields.name}
                </span>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
