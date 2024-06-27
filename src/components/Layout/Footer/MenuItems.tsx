import { WebConfig } from '@origins-digital/types/web-experience';

export default function MenuItems({ config }: { config: WebConfig['footer']['menuItems'] }) {
  return (
    <ul>
      {config.map((item) => {
        return (
          <li key={item._kenticoId} className={'text-white'}>
            {item.name}
          </li>
        );
      })}
    </ul>
  );
}
