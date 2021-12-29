import { render, screen, fireEvent } from '@testing-library/react';
import SearchBar from '.';

describe('Components:SearchBar', () => {
  it('Should render and match snapshot', () => {
    const { container } = render(<SearchBar />);
    expect(container).toMatchSnapshot();
  });

  it('Should be able to accept keyword props', () => {
    render(<SearchBar keyword='abcdefg' />);
    const input = screen.getByTestId('search-input');
    expect(input.value).toBe('abcdefg');
  });

  it('Should handle input change', () => {
    const listener = jest.fn();
    render(<SearchBar keywordHandler={listener} />);
    const input = screen.getByTestId('search-input');
    fireEvent.change(input, { target: { value: 'new keyword' } });
    expect(listener).toHaveBeenCalledWith('new keyword');
  });
});
