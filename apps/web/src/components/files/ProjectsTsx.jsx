import React from 'react';
import CodeView from '@/components/editor/CodeView.jsx';
import { K, S, N, P, T, V, F, A, C, Tag, Quote, Indent, MdLink } from '@/components/editor/tokens.jsx';
import { cv, FILES } from '@/data/cv.js';

const file = FILES.find((f) => f.id === 'projects');

export default function ProjectsTsx() {
  const items = cv.projects;
  const lines = [];

  lines.push(
    <>
      <K>import</K> <P>{'{ '}</P>
      <V>Card</V>
      <P>{', '}</P>
      <V>Stack</V>
      <P>{', '}</P>
      <V>Badge</V>
      <P>{' }'}</P> <K>from</K> <Quote>./ui</Quote>
      <P>;</P>
    </>,
  );
  lines.push(<></>);
  lines.push(
    <>
      <K>type</K> <T>Project</T> <P>= </P>
      <P>{'{'}</P>
    </>,
  );
  lines.push(
    <>
      <Indent />
      <V>name</V>
      <P>: </P>
      <T>string</T>
      <P>; </P>
      <V>org</V>
      <P>: </P>
      <T>string</T>
      <P>; </P>
      <V>period</V>
      <P>: </P>
      <T>string</T>
      <P>; </P>
      <V>venue</V>
      <P>?: </P>
      <T>string</T>
      <P>;</P>
    </>,
  );
  lines.push(
    <>
      <Indent />
      <V>stack</V>
      <P>: </P>
      <T>string</T>
      <P>[]; </P>
      <V>status</V>
      <P>: </P>
      <Quote>active</Quote>
      <P>{' | '}</P>
      <Quote>published</Quote>
      <P>{' | '}</P>
      <Quote>completed</Quote>
      <P>;</P>
    </>,
  );
  lines.push(
    <>
      <P>{'};'}</P>
    </>,
  );
  lines.push(<></>);
  lines.push(
    <>
      <K>const</K> <V>projects</V>
      <P>: </P>
      <T>Project</T>
      <P>[] = [</P>
    </>,
  );

  items.forEach((p) => {
    lines.push(
      <>
        <Indent />
        <P>{'{ '}</P>
        <V>name</V>
        <P>: </P>
        <Quote>{p.name}</Quote>
        <P>{', '}</P>
        <V>period</V>
        <P>: </P>
        <Quote>{p.period}</Quote>
        <P>{', '}</P>
        <V>status</V>
        <P>: </P>
        <Quote>{p.status}</Quote>
        <P>{' },'}</P>
        {' '}
        <C>{'// ' + p.tagline}</C>
      </>,
    );
  });

  lines.push(<P>];</P>);
  lines.push(<></>);
  lines.push(
    <>
      <K>export default function</K> <F>Projects</F>
      <P>{'() {'}</P>
    </>,
  );
  lines.push(
    <>
      <Indent />
      <K>return</K> <P>(</P>
    </>,
  );
  lines.push(
    <>
      <Indent n={2} />
      <P>{'<'}</P>
      <Tag>Stack</Tag> <A>cols</A>
      <P>{'='}</P>
      <P>{'{'}</P>
      <N>2</N>
      <P>{'}'}</P>
      <P>{'>'}</P>
    </>,
  );

  items.forEach((p) => {
    lines.push(
      p.url ? (
        <>
          <Indent n={3} />
          <P>{'<'}</P>
          <Tag>Card</Tag> <A>title</A>
          <P>=</P>
          <Quote>{p.fullTitle || p.name}</Quote> <A>href</A>
          <P>=</P>
          <S>"</S>
          <MdLink href={p.url}>{p.url}</MdLink>
          <S>"</S>
          <P>{'>'}</P>
        </>
      ) : (
        <>
          <Indent n={3} />
          <P>{'<'}</P>
          <Tag>Card</Tag> <A>title</A>
          <P>=</P>
          <Quote>{p.fullTitle || p.name}</Quote>
          <P>{'>'}</P>
        </>
      ),
    );
    lines.push(
      <>
        <Indent n={4} />
        <C>{'// ' + p.period + ' · ' + p.org + (p.venue ? ' · ' + p.venue : '')}</C>
      </>,
    );
    p.highlights.forEach((h) => {
      lines.push(
        <>
          <Indent n={4} />
          <V>{'• ' + h}</V>
        </>,
      );
    });
    lines.push(
      <>
        <Indent n={4} />
        <P>{'<'}</P>
        <Tag>Badge</Tag>
        <P>{'>'}</P>
        <V>{p.stack.join(' · ')}</V>
        <P>{'</'}</P>
        <Tag>Badge</Tag>
        <P>{'>'}</P>
      </>,
    );
    lines.push(
      <>
        <Indent n={3} />
        <P>{'</'}</P>
        <Tag>Card</Tag>
        <P>{'>'}</P>
      </>,
    );
  });

  lines.push(
    <>
      <Indent n={2} />
      <P>{'</'}</P>
      <Tag>Stack</Tag>
      <P>{'>'}</P>
    </>,
  );
  lines.push(
    <>
      <Indent />
      <P>{');'}</P>
    </>,
  );
  lines.push(<P>{'}'}</P>);

  return (
    <CodeView id="projects" file={file} footer={`${items.length} projects · 3 publications · FAU EECS`}>
      {lines.map((node, i) => (
        <span key={i} className="contents">{node}</span>
      ))}
    </CodeView>
  );
}
