import { NextResponse } from 'next/server'

import connectToDB from '@database'
import Favorite from '@models/Favorite'

export const dynamic = 'force-dynamic'

export async function DELETE(request) {
  try {
    await connectToDB()

    // Capturar el id del favorito a eliminar desde el query param
    const { searchParams } = new URL(request.url)
    const type = searchParams.get('type')
    const mediaID = Number(searchParams.get('mediaID'))
    const id = Number(searchParams.get('id'))

    if (!type && (!mediaID || !id)) {
      return NextResponse.json({
        success: false,
        message: 'Favorite mediaID not found',
      }, { status: 404 })
    }

    const query = { type }
    mediaID ? query.mediaID = mediaID : query.mediaID = id

    // Eliminar la cuenta
    const deleteFavorite = await Favorite.findOneAndDelete(query)
    console.log(deleteFavorite)

    if (deleteFavorite) {
      return NextResponse.json({
        success: true,
        body: { deleteFavorite },
        message: 'Favorite deleted successfully',
      }, { status: 200 })
    } else {
      return NextResponse.json({
        success: false,
        message: 'Favorite not found',
      }, { status: 404 })
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
