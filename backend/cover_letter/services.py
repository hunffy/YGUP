from backend import db
from backend.user.models import User
from backend.company.models import Company
from backend.cover_letter.models import Cover_letter
from backend.cover_letter.schemas import cover_letter_schema
from sqlalchemy import and_
import json
def create_cover_letter(data):
    """Given serialized data and create a ner User"""
    res = db.session.query(User).filter(and_(User.id == data['id'], Company.cname == data['cname'])).all()
    if not res:
        return 'fail', 404
    cover_letter = cover_letter_schema.load(data)
    db.session.add(cover_letter)
    db.session.commit()
    return cover_letter_schema.dump(cover_letter), 201

def update_cover_letter(data):
    """Update company"""

    res = db.session.query(Cover_letter).filter(and_(Cover_letter.clno == data['clno'],
        User.id == data['id'], Company.cname == data['cname'])).update(
        {
        "clno": data['clno'], "id": data['id'],"cname": data['cname'],
        "content_1": data['content_1'], "content_2": data['content_2'],
        "content_3": data['content_3'], "wdate": data['wdate'],
        "clname": data['clname']
        })

    if not res:
        return 'fail', 404

    db.session.commit()

    return 'Update OK', 200

def delete_cover_letter(data):
    """Delete Cover_letter"""

    res = db.session.query(Cover_letter).filter(and_(Cover_letter.clno == data['clno'],
          User.id == data['id'], Company.cname == data['cname'])).all()

    if not res:
        return 'fail', 404

    for r in res:
        db.session.delete(r)
        db.session.commit()




