import React, {useEffect, useState} from 'react';
import MainGrid from '../src/components/MainGrid';
import Box from '../src/components/Box';
import ProfileRelationsBoxWrapper from '../src/components/ProfileRelations';
import { AlurakutMenu, AlurakutProfileSidebarMenuDefault, OrkutNostalgicIconSet } from '../src/lib/AlurakutCommons';

const READ_TOKEN = process.env.NEXT_PUBLIC_API_READ_ONLY_TOKEN;

function ProfileSideBar(props) {
  const {githubUser} = props;

  return (
    <Box>
      <img src={`https://github.com/${githubUser}.png`} alt="User Profile" style={{ borderRadius: '8px'}} />
      <hr />

      <p>
        <a className="boxLink" href={`https://github.com/${githubUser}`}>
          @{githubUser}
        </a>
      </p>
      <hr />

      <AlurakutProfileSidebarMenuDefault />
    </Box>
);
}

export default function Home() {
  const [communities, setCommunities] = React.useState([{id: 1, title: 'Odeio segunda-feira', image: 'https://alurakut.vercel.app/capa-comunidade-01.jpg'}]);
  const [followers, setFollowers] = useState([]);

  console.log(followers);

  const githubUser = 'matgomes21';
  const favoritePeople = [
    'Matheusafonsouza',
    'viniciussaturnino',
    'matheusyanmonteiro',
    'thiagompc',
    'twistershark'
  ];


  useEffect(() => {
    fetch('https://api.github.com/users/matgomes21/followers').then((data) => data.json()).then((parsedData)=> {
      setFollowers(parsedData);
    });

    // API GraphQL
    fetch('https://graphql.datocms.com/', {
      method: 'POST',
      headers: {
        'Authorization': READ_TOKEN,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        'query': `query {
          allCommunities {
            title
            id
            imageUrl
            creatorSlug
          }
        }`
      })
    })
    .then((response)=>response.json())
    .then((parsedResponse)=>{
      setCommunities(parsedResponse.data.allCommunities);
    });

  },[]);

  return (
    <>
      <AlurakutMenu />
      <MainGrid>
        <div className="profileArea" style={{gridArea: 'profileArea'}}>
          <ProfileSideBar githubUser={githubUser} />
        </div>
        <div className="welcomeArea" style={{gridArea: 'welcomeArea'}}>
          <Box>
            <h1 className="title">
              Bem vindo
            </h1>

            <OrkutNostalgicIconSet />
          </Box>

          <Box>
            <h2>O que você deseja fazer?</h2>
            <form onSubmit={function handleCreateCommunity(e) {
              e.preventDefault();
              const formData = new FormData(e.target);

              const communityBody = {
                title: formData.get('title'),
                imageUrl: formData.get('image'),
                creatorSlug: githubUser,
              };

              fetch('/api/communities', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(communityBody)
              })
              .then(async (response) => {
                const data = await response.json();
                const {community} = data;
                setCommunities([...communities, community]);
              });

            }}>
              <div>
                <input
                  placeholder="Qual vai ser o nome da sua comunidade?"
                  name="title" 
                  aria-label="Qual vai ser o nome da sua comunidade?"
                  type="text"
                />
              </div>
              <div>
                <input
                  placeholder="Coloque uma URL para ser usada de capa"
                  name="image" 
                  aria-label="Coloque uma URL para ser usada de capa"
                  type="text"
                />
              </div>

              <button type="submit" >
                Criar comunidade
              </button>
            </form>
          </Box>
        </div>
        <div className="profileRelationsArea" style={{gridArea: 'profileRelationsArea'}}>
          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">
              Comunidades ({communities.length})
            </h2>
            <ul>
              {communities.map((community)=>(
                <li key={community.id}>
                  <a href={`/comunidades/${community.title}`} key={community.title}>
                    <img src={community.imageUrl} alt={`${community.title} Community`} />
                    <span>{community.title}</span>
                  </a>
                </li>
                ))}
            </ul>
          </ProfileRelationsBoxWrapper>
          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">
              Pessoas ({favoritePeople.length})
            </h2>

            <ul>
              {favoritePeople.map((person)=>(
                <li>
                  <a href={`/users/${person}`} key={person}>
                    <img src={`https://github.com/${person}.png`} alt={`${person} Profile`} />
                    <span>{person}</span>
                  </a>
                </li>
                ))}
            </ul>
          </ProfileRelationsBoxWrapper>
        </div>
      </MainGrid>
    </>
  );
}
