const {
  SERVER_EFS_ID,
  SERVER_USER_ROLE,
} = require('./utils/config');

/*
{
  username: 'user',
  sourceIp: '10.23.0.25',
  protocol: 'FTP',
  serverId: 's-1dd762b3c8e9463f9',
  password: 'password'
}

{
  username: 'user',
  sourceIp: '10.23.0.25',
  protocol: 'FTPS',
  serverId: 's-1dd762b3c8e9463f9',
  password: 'password'
}

{
  username: 'user',
  sourceIp: '10.23.0.25',
  protocol: 'SFTP',
  serverId: 's-1dd762b3c8e9463f9',
  password: 'password'
}
*/

// https://docs.aws.amazon.com/transfer/latest/userguide/custom-identity-provider-users.html#custom-lambda-idp

async function handler(event, context) {
  console.log(event);
  console.log(context);


  const authResposne = {
    Role: SERVER_USER_ROLE,
    HomeDirectoryType: 'LOGICAL',
    HomeDirectoryDetails: JSON.stringify([
      {
        'Entry': '/',
        'Target': `/${SERVER_EFS_ID}`,
      }
    ]),
    PosixProfile: {
      Gid: '1',
      Uid: '1'
    },
  };
  console.log(authResposne);

  return authResposne;
}

module.exports = {
  handler,
};
