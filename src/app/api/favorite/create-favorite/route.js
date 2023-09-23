import { NextResponse } from 'next/server'

import connectToDB from '@database'
import Favorite from '@models/Favorite'

export const dynamic = 'force-dynamic'

export async function POST(request) {
  try {
    await connectToDB()

    const { uid, accountID, mediaID, type, backdrop_path, poster_path } = await request.json()

    // Chequear si el favorito ya existe para la cuenta actual
    const isFavoriteAlreadyExists = await Favorite.findOne({ uid, accountID, mediaID })

    // Si el favorito ya existe, devolver mensaje de error
    if (isFavoriteAlreadyExists) {
      return NextResponse.json({
        success: false,
        message: 'This media is already in your favorites',
      }, { status: 400 })
    }

    // Crear el favorito
    const newFavorite = await Favorite.create({
      uid, accountID, mediaID, type, backdrop_path, poster_path
    })
    // Si el favorito se creó correctamente, devolver mensaje de éxito
    if (newFavorite) {
      return NextResponse.json({
        success: true,
        message: 'Favorite added successfully',
      }, { status: 201 })
    } else {
      return NextResponse.json({
        success: false,
        message: 'Something went wrong',
      }, { status: 500 })
    }
  } catch (error) {
    console.log(error.message)
    return NextResponse.json({
      success: false,
      body: { error },
      message: 'Something went wrong',
    }, { status: 500 })
  }
}
