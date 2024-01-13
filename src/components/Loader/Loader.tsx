import spinnerImage from '../../assets/img/loader.png';
import { InlineLoader } from './InlineLoader';
import './Loader.css';

export interface ILoader {
  fullscreen?: boolean;
  inline?: boolean;
}

export const Loader: React.FC<ILoader> = (props) => {
  if (props.inline) return <InlineLoader />

  const className = () => `loader ${props.fullscreen ? 'loader-fullscreen' : ''}`;

  return (
    <div className={className()}>
      <div className='loader-spinner'>
        <img className='loader-spinner-img' src={spinnerImage} />
      </div>
    </div>
  )
}
