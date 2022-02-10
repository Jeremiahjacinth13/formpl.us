import { render, fireEvent } from '@testing-library/react';
import { Banner } from '../components';

describe('everything works find', () => {

  test('banner component renders correct', async () => {
    const BannerComponent = render(<Banner />);
    expect(BannerComponent).toBeInTheDocument;
  });

  test('two plus two is four', async () => {
    expect(2 + 2).toEqual(4)
  });

})

// test()