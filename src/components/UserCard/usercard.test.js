import { render, screen } from '@testing-library/react';
import UserCard from './index';


const props = {
  idx: 123,
  user: {
    name: {
      first: 'Taufik',
      last: 'Akbar',
    },
    cell: '082129136223',
    email: 'taufik.akbar7@gmail.com',
    dob: {
      date: '1994-05-17',
    },
    picture: {
      medium: 'https://some.picture.url',
    },
  },
};

describe('Component:UserCard', () => {
  it.each([
    ['Driver ID', /drv632/i],
    ['Driver name', /taufik, akbar/i],
    ['Driver Phone Number', /082129136223/i],
    ['Driver Email', /taufik.akbar7@gmail.com/i],
    ['Driver DoB', /17-05-1994/i],
  ])('Should contain %s', (_, text) => {
    render(<UserCard user={props.user} idx={props.idx}/>);
    const element = screen.getByText(text);
    expect(element).toBeInTheDocument();
  });

  it('Should match snapshot', () => {
    const {container} = render(<UserCard user={props.user} idx={props.idx}/>);
    expect(container).toMatchSnapshot();
  });
});