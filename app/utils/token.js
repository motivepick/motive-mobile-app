// @flow

export const fromUrl = (url: string) => url.replace('motive://', '').replace('#_=_', '')
