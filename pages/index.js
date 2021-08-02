import React, {useEffect, useState} from 'react';
import MainGrid from '../src/components/MainGrid';
import Box from '../src/components/Box';
import ProfileRelationsBoxWrapper from '../src/components/ProfileRelations';
import { AlurakutMenu, AlurakutProfileSidebarMenuDefault, OrkutNostalgicIconSet } from '../src/lib/AlurakutCommons';

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

  const githubUser = 'matgomes21';
  const favoritePeople = [
    'Matheusafonsouza',
    'viniciussaturnino',
    'matheusyanmonteiro',
    'thiagompc',
    'twistershark'
  ];

  const [followers, setFollowers] = useState([]);

  useEffect(() => {
    fetch('https://api.github.com/users/matgomes21/followers').then((data) => data.json()).then((parsedData)=> {
      setFollowers(parsedData);
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

              const community = {
                title: formData.get('title'),
                image: formData.get('image'),
              };

              setCommunities([...communities, community]);
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
                <li>
                  <a href={`/users/${community.title}`} key={community.title}>
                    <img src={community.image} alt={`${community.title} Community`} />
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
