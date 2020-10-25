/**
 * VK service provider
 */

import { interpolateUrl, registerGlobalCallback } from '../utils';
import { loadScript } from '../dom';

const vkontakte = {
    counterUrl: 'https://vk.com/share.php?act=count&url={url}&index={index}',
    fetch(updateBroadcaster) {
        this.broadcasters.push(updateBroadcaster);
        loadScript(interpolateUrl(updateBroadcaster.url, {
            index: this.broadcasters.length - 1,
        }));
    },
    broadcasters: [],
    popupUrl: 'https://vk.com/share.php?url={url}&title={title}',
    popupWidth: 550,
    popupHeight: 330,
    knownParams: ['url', 'title', 'image', 'description'],
    svgIconPath: 'm13.0009 15h-3.5008c-1.00024 0-1.2003.4708-1.2003.9898 0 .9271 1.18686 5.525 5.5262 11.6061 2.8929 4.1529 6.9687 6.4041 10.6776 6.4041 2.2253 0 2.5006-.5 2.5006-1.3612v-3.1388c0-1 .2108-1.1996.9154-1.1996.5193 0 1.4094.2596 3.4864 2.2619 2.3737 2.3731 2.765 3.4377 4.1001 3.4377h3.5008c1.0003 0 1.5004-.5 1.2119-1.4867-.3157-.9834-1.449-2.4103-2.9528-4.1016-.816-.9641-2.0399-2.0023-2.4108-2.5215-.5192-.6674-.3709-.9641 0-1.5573 0 0 4.2652-6.007 4.7103-8.0463.2225-.7417 0-1.2866-1.0587-1.2866h-3.5008c-.8901 0-1.3005.4708-1.5231.9898 0 0-1.7802 4.3384-4.3022 7.1565-.816.8157-1.1869 1.0753-1.632 1.0753-.2225 0-.5446-.2596-.5446-1.0011v-6.9339c0-.89-.2583-1.2866-1.0002-1.2866h-5.5013c-.5562 0-.8908.413-.8908.8045 0 .8436 1.261 1.0382 1.391 3.4113v5.1542c0 1.13-.2042 1.3349-.6492 1.3349-1.1868 0-4.0737-4.3578-5.7859-9.3442-.3355-.9692-.6721-1.3607-1.5668-1.3607z',
};

// Gets called by the script provided by the service
registerGlobalCallback('VK.Share.count', (index, count) => {
    vkontakte.broadcasters[index].trigger(count);
});

export default vkontakte;
