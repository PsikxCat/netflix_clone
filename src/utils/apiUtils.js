export function setRandomAccountAvatar() {
  const AccountAvatares = [
    'https://api.dicebear.com/7.x/bottts/svg?seed=Smokey',
    'https://api.dicebear.com/7.x/bottts/svg?seed=Spooky',
    'https://api.dicebear.com/7.x/bottts/svg?seed=Miss%20kitty',
    'https://api.dicebear.com/7.x/bottts/svg?seed=Sassy',
    'https://api.dicebear.com/7.x/bottts/svg?seed=Bear',
    'https://api.dicebear.com/7.x/bottts/svg?seed=Tinkerbell',
    'https://api.dicebear.com/7.x/bottts/svg?seed=Ginger',
    'https://api.dicebear.com/7.x/bottts/svg?seed=Jasmine',
  ]

  const randomAvatar = Math.floor(Math.random() * AccountAvatares.length)
  return AccountAvatares[randomAvatar]
}

export async function createAccount(formData, uid) {
  const avatar = await setRandomAccountAvatar()

  try {
    const response = await fetch('/api/account/create-account', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...formData,
        uid,
        avatar
      }),
    })

    return await response.json()
  } catch (error) {
    throw new Error('Error creating account: ' + error.message)
  }
}

export async function getAccounts(session) {
  try {
    const response = await fetch(`/api/account/get-accounts?uid=${session?.user?.uid}`, {
      method: 'GET',
    })

    return await response.json()
  } catch (error) {
    throw new Error('Error getting accounts: ' + error.message)
  }
}

export async function deleteAccount(accountId) {
  try {
    const response = await fetch(`/api/account/delete-account?id=${accountId}`, {
      method: 'DELETE',
    })
    return await response.json()
  } catch (error) {
    throw new Error('Error deleting account: ' + error.message)
  }
}

export async function loginAccount(accountId, pin) {
  try {
    const response = await fetch('api/account/login-account', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ accountId, pin }),
    })

    return await response.json()
  } catch (error) {
    throw new Error('Error logging in account: ' + error.message)
  }
}
