import { NextResponse } from 'next/server'

import connectToDB from '@database'
import Favorite from '@models/Favorite'

export async function GET(request) {
  try {
    await connectToDB()

    // Capturar el uid del perfil de sesion y el id de la cuenta desde el query param
    const { searchParams } = new URL(request.url)
    const uid = searchParams.get('uid')
    const accountID = searchParams.get('accountID')

    // Capturar las cuentas asociadas al perfil
    const getFavorites = await Favorite.find({ uid, accountID })

    if (getFavorites) {
      return NextResponse.json({
        success: true,
        body: { accountFavorites: getFavorites },
        message: 'Favorites retrieved successfully',
      }, { status: 200 })
    } else {
      return NextResponse.json({
        success: false,
        message: 'Favorites not found',
      }, { status: 404 })
    }
  } catch (error) {
    console.log(error.message)
    return NextResponse.json({
      success: false,
      body: { error },
      message: 'Something went wrong',
    })
  }
}
