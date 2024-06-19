import { SectionDynamicGridWithCategory } from '@origins-digital/types/ott';

export default function DynamicGrid(config: SectionDynamicGridWithCategory) {
  return (
    <div className={'text-white'}>
      <h1>{config.title}</h1>
      <p>{config.description}</p>
      <div>
        {config.Videos.map((video) => (
          <div key={video.itemId}>
            <h2>{video.name}</h2>
            <p>{video.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
