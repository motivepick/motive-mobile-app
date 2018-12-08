import { fromUrl } from 'token'

it('extracts token from URL without anchor', () => {
    expect(fromUrl('motive://eyJhbGc-iOiJIU.zUxMiJ9')).toEqual('eyJhbGc-iOiJIU.zUxMiJ9')
})

it('extracts token from URL with anchor', () => {
    expect(fromUrl('motive://eyJhbGc-iOiJIU.zUxMiJ9#_=_')).toEqual('eyJhbGc-iOiJIU.zUxMiJ9')
})
