import React from 'react'
import Image from 'next/image'

/**
 * Imahe Properties:
 * 1. alt:
 *    > describe the image for screen readers and search engines.
 *    > also acts as fallback text
 * 2. width & height:
 *    > These properties represents the image size in pixels.
 * 3. fill:
 *    > boolean that causes the image to expand to the size of the 
 *      parent element.
 * 4. Object Fit:
 *    > If no styles are applied to the image, the image will stretch
 *      to fit the container.
 *    > You can use objectFit to control cropping and scaling.
 *      - "contain": The image will be scaled down to fit the container
 *        and preserve aspect ratio.
 *      - "cover": The image will fit the container and be cropped.
 * 5. loader:
 *    > Custom fn used to generated the image URL.
 *    > The fn recieves the following params, and returns a URL string
 *      for the image:
 *      - src
 *      - width
 *      - quality
 * 
 *    > const imageLoader = ({ src, width, quality }) => {
 *         return `https://example.com/${src}?w=${width}&q=${quality || 75}`
 *      }
 * 
 *      export default function Page () {
 *         return (
 *            <Image
 *              loader={imageLoader}
 *              src="me.png"
 *              alt="Picture of the author"
 *              width={500}
 *              height={500}
 *         )
 *      }
 * 
*/

const ExampleImage = () => {
  return (
    <div className='flex flex-col items-center justify-center h-screen'>
        <Image 
            src={"https://media.daily.dev/image/upload/s--mAplB3Xr--/f_auto/v1755881710/posts/NBiwRP07x?_a=BAMClqZW0"}
            alt={"Vercel Logo"}
            width={100}
            height={100}
        />
    </div>
  )
}

export default ExampleImage