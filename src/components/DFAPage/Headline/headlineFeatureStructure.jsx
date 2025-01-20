

export default function headlineFeatureModule(data){

  const headlines = data.map(item => {

    let data_point = {}

    data_point['author'] = item.attributes['Author']
    data_point['headline'] = item.attributes['Headline']
    data_point['title'] = item.attributes['Title']
    data_point['type'] = item.attributes['Type']
    data_point['content'] = item.attributes['HeadlineContent']
    data_point['image'] = item.attributes['CardImage'].data.attributes.url

    return data_point
  }) 

  return headlines 

}