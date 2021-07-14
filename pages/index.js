import React from 'react';
import MainGrid from '../src/components/MainGrid';
import Box from '../src/components/Box';
import { ProfileRelationsBoxWrapper } from '../src/components/ProfileRelations';
import { AlurakutMenu, OrkutNostalgicIconSet } from '../src/lib/AlurakutCommons';

function ProfileSideBar(props) {
  const {githubUser} = props;
  return (
    <Box>
      <img src={`https://github.com/${githubUser}.png`} alt="User Profile" style={{ borderRadius: '8px'}} />
    </Box>
);
}

export default function Home() {
const githubUser = 'matgomes21';
const favoritePeople = [
  'Matheusafonsouza',
  'viniciussaturnino',
  'matheusyanmonteiro',
  'thiagompc',
  'twistershark'
];

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
        </div>
        <div className="profileRelationsArea" style={{gridArea: 'profileRelationsArea'}}>
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
          <Box>
            Comunidades
          </Box>
        </div>
      </MainGrid>
    </>
  );
}
