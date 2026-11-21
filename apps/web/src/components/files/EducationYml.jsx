import React from 'react';
import CodeView from '@/components/editor/CodeView.jsx';
import { S, N, P, A, C, Indent, MdLink } from '@/components/editor/tokens.jsx';
import { cv, FILES } from '@/data/cv.js';

const file = FILES.find((f) => f.id === 'education');

const Field = ({ name, value, isNumber, indent = 1 }) => (
  <>
    <Indent n={indent} />
    <A>{name}</A>
    <P>: </P>
    {isNumber ? <N>{value}</N> : <S>{value}</S>}
  </>
);

export default function EducationYml() {
  const { education, certifications } = cv;
  const lines = [];

  lines.push(<C># Formal education</C>);
  lines.push(<></>);
  lines.push(
    <>
      <A>education</A>
      <P>:</P>
    </>,
  );
  education.forEach((edu) => {
    lines.push(
      <>
        <Indent />
        <P>- </P>
        <A>degree</A>
        <P>: </P>
        <S>{edu.degree}</S>
      </>,
    );
    lines.push(<Field name="university" value={edu.university} indent={2} />);
    lines.push(<Field name="period" value={edu.period} indent={2} />);
    lines.push(<Field name="location" value={edu.location} indent={2} />);
    lines.push(
      <>
        <Indent n={2} />
        <A>coursework</A>
        <P>:</P>
      </>,
    );
    edu.coursework.forEach((course) => {
      lines.push(
        <>
          <Indent n={3} />
          <P>- </P>
          <S>{course}</S>
        </>,
      );
    });
    lines.push(<></>);
  });

  lines.push(<C># Certifications</C>);
  lines.push(<></>);
  lines.push(
    <>
      <A>certifications</A>
      <P>:</P>
    </>,
  );
  certifications.forEach((cert) => {
    lines.push(
      <>
        <Indent />
        <P>- </P>
        <A>name</A>
        <P>: </P>
        <S>{cert.name}</S>
      </>,
    );
    lines.push(<Field name="date" value={cert.date} indent={2} />);
    lines.push(
      <>
        <Indent n={2} />
        <A>credential</A>
        <P>: </P>
        <MdLink href={cert.url}>{cert.linkLabel}</MdLink>
      </>,
    );
  });

  return (
    <CodeView id="education" file={file} footer={`${education.length} degrees · ${certifications.length} certs · YAML 1.2`}>
      {lines.map((node, i) => (
        <span key={i} className="contents">{node}</span>
      ))}
    </CodeView>
  );
}