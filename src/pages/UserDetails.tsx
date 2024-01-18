import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import Loading from 'components/Loading';
import { Button } from 'components/Tasks/AddTask';
import { fetchUserData } from 'services/dataService';
import { getStyleFromProps } from 'utils/getStyleFromProps';

const UserDetailsWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;

  a {
    color: ${props => getStyleFromProps(props, 'btnColor')};
    text-decoration: none;
  }

  button {
    margin-right: auto;
  }
`;

const UserContainer = styled.div`
  width: 100%;
  display: flex;
  margin-top: 32px;
  padding-bottom: 32px;
  justify-content: center;

  span {
    margin-left: 8px;
  }

  img {
    width: 100%;
    max-width: 400px;
  }

  @media screen and (max-width: 930px) {
    align-items: center;
    flex-direction: column;
  }
`;

const UserDetailsContainer = styled.div`
  margin-right: 32px;
  
  @media screen and (max-width: 930px) {
    margin-right: 0px;
    margin-bottom: 32px;
  }
`;

const H1 = styled.h1`
  margin-top: 0;
  text-align: center;
`;

interface UserData {
  id: number;
  age: number;
  name: string;
  email: string;
  address: string;
  imageSrc: string;
}

const UserDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState<null | UserData>(null);

  useEffect(() => {
    const abortController = new AbortController();
    const { signal } = abortController;
    fetchUserData(signal, String(id))
      .then((res) => {
        setIsLoading(false);
        setUserData(res);
      });

    return () => {
      abortController.abort();
    };
  }, [id]);

  return (
    <UserDetailsWrapper>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <Button onClick={() => navigate(-1)}>
            Go to Back
          </Button>
          <H1>User Details</H1>
          <UserContainer>
            <UserDetailsContainer>
              <div>User name: <span>{userData?.name}</span></div>
              <div>User email: <span>{userData?.email}</span></div>
              <div>User age: <span>{userData?.age}</span></div>
              <div>User address: <span>{userData?.address}</span></div>
            </UserDetailsContainer>
            <LazyLoadImage
              height={300}
              alt="User Image"
              src={userData?.imageSrc}
              style={{ objectFit: 'cover' }}
            />
          </UserContainer>
        </>
      )}
    </UserDetailsWrapper>
  );
};

export default UserDetails;