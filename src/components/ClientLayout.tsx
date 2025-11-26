
import { MainContent, ContentWrapper } from './StyledLayout';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <MainContent>
      <ContentWrapper>
        {children}
      </ContentWrapper>
    </MainContent>
  );
}
