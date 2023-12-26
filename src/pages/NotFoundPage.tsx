import { WithBanner } from './templates';

export const NotFoundPage = () => {
  return (
    <WithBanner>
      <section className='top-sales'>
        <h2 className='text-center'>Страница не найдена</h2>
        <p>
          Извините, такая страница не найдена!
        </p>
    </section>
  </WithBanner>
  )
}
