import React from 'react';
import CodeView from '@/components/editor/CodeView.jsx';
import { K, S, N, P, V, F, C, Quote, MdLink } from '@/components/editor/tokens.jsx';
import { cv, FILES } from '@/data/cv.js';

const file = FILES.find((f) => f.id === 'contact');

export default function ContactSh() {
  const { contact, social, identity } = cv;

  const lines = [];
  lines.push(<C>#!/usr/bin/env bash</C>);
  lines.push(<C># Pick the channel that fits — feel free to reach out via email or academic links.</C>);
  lines.push(<></>);
  lines.push(
    <>
      <V>EMAIL</V>
      <P>=</P>
      <Quote>{contact.email}</Quote>
    </>,
  );
  lines.push(
    <>
      <V>ACADEMIC_EMAIL</V>
      <P>=</P>
      <Quote>{contact.academicEmail}</Quote>
    </>,
  );
  lines.push(
    <>
      <V>LOCATION</V>
      <P>=</P>
      <Quote>{contact.location}</Quote>
    </>,
  );
  lines.push(
    <>
      <V>PUBLICATIONS</V>
      <P>=</P>
      <Quote>{contact.publications}</Quote>
    </>,
  );
  lines.push(
    <>
      <V>PORTFOLIO</V>
      <P>=</P>
      <Quote>{contact.portfolio}</Quote>
    </>,
  );
  lines.push(<></>);
  lines.push(<C># Direct lines</C>);
  lines.push(
    <>
      <F>open</F> <S>"mailto:</S>
      <MdLink href={`mailto:${contact.email}`}>{contact.email}</MdLink>
      <S>"</S>
    </>,
  );
  lines.push(
    <>
      <F>open</F> <S>"mailto:</S>
      <MdLink href={`mailto:${contact.academicEmail}`}>{contact.academicEmail}</MdLink>
      <S>"</S> <C># Florida Atlantic University</C>
    </>,
  );
  lines.push(<></>);
  lines.push(<C># Find me online</C>);
  social.forEach((s) => {
    lines.push(
      <>
        <F>open</F> <S>"</S>
        <MdLink href={s.url}>{s.url.replace(/^https?:\/\//, '')}</MdLink>
        <S>"</S> <C># {s.label}</C>
      </>,
    );
  });
  lines.push(<></>);
  lines.push(
    <>
      <F>echo</F> <Quote>Open to robotics research collaborations, internships, and autonomous systems roles.</Quote>
    </>,
  );
  lines.push(
    <>
      <F>echo</F> <Quote>Based in {contact.location} (FAU EECS, Boca Raton).</Quote>
    </>,
  );
  lines.push(<></>);
  lines.push(
    <>
      <K>exit</K> <N>0</N>
    </>,
  );

  return (
    <CodeView id="contact" file={file} footer={`bash · ${social.length} links · ${identity.timezone}`}>
      {lines.map((node, i) => (
        <span key={i} className="contents">{node}</span>
      ))}
    </CodeView>
  );
}
