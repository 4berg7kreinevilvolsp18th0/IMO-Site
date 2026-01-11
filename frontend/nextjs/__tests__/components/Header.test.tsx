import { render, screen } from '@testing-library/react';
import Header from '../../components/Header';

// Mock next/navigation
jest.mock('next/navigation', () => ({
  usePathname: () => '/',
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
  }),
}));

describe('Header', () => {
  it('renders header component', () => {
    render(<Header />);
    // Add more specific tests based on your Header component
    expect(document.body).toBeInTheDocument();
  });
});

